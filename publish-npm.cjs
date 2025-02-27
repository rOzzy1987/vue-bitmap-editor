/**
 * NPM publish script
 *
 * Publishes a new version of teh project to npm
 *
 * Usage: node publish-npm [Options]
 * Options:
 *   -i, --increment-version:
 *       increments build number in package.json's version field
 *   -m <msg>, --message <msg>:
 *       adds <msg> as commit message after incrementing version number
 */
'use strict'

// eslint-disable-file @typescript-eslint/no-require-imports
var fs = require('fs')
var { spawn } = require('child_process')
const { spawnSync } = require('child_process')

var argv = process.argv.slice(2)
var argc = argv.length

var log = fs.createWriteStream('publish.log')
var err = log
var clog = console.log
var cerr = console.error
console.log = function (...args) {
    clog(...args)
    for (var l of args) log.write(`[INF] ${new Date().toISOString()} ${l}\n`)
}
console.error = function (...args) {
    cerr(...args)
    for (var l of arguments) log.write(`[ERR] ${new Date().toISOString()} ${l}\n`)
}

function runCmd(cmd, args) {
    console.log(`[RunCmd] Running command: ${cmd} ${args.join(' ')}`)
    var res = spawnSync(cmd, args)
    function removeEmptyLines(ls) {
        if (ls == undefined) return []
        for (var i = ls.length - 1; i >= 0; i--)
            if (ls[i].trimEnd() == '') ls.pop()
            else return ls
        return ls
    }
    for (var l of removeEmptyLines(res.stdout.toString().split('\n'))) console.log(l)
    for (var l of removeEmptyLines(res.stderr.toString().split('\n'))) console.error(l)
    if (res.status != 0) {
        console.error(`[RunCmd] Process exited with code ${res.status}\n`)
        throw `[RunCmd] Error Running command: ${cmd} ${args.join(' ')}`
    } else {
        console.log(`[RunCmd] Process exited with code ${res.status}\n`)
    }
    return res.stdout.toString()
}

function checkArguments(argc, argv) {
    var increment = false
    var message = undefined
    for (var i = 0; i < argc; i++) {
        if (argv[i] == '-i' || argv[i] == '--increment-version') increment = true
        if ((argv[i] == '-m' || argv[i] == '--message') && argc > i + 1)
            message = argv[++i].replace('\\n', '\n')
    }

    if (increment) {
        incrementVersion(message)
    }
}

function incrementVersion(message) {
    var rawdata = fs.readFileSync('package.json')
    var packJson = JSON.parse(rawdata)

    var match = /([0-9]+).([0-9]+).([0-9]+)/g.exec(packJson.version)
    var maj = match[1]
    var min = match[2]
    var rev = Number(match[3])

    packJson.version = `${maj}.${min}.${++rev}`

    fs.writeFileSync('package.json', JSON.stringify(packJson, null, 2))

    console.log('[Publish] package.json updated, new version: ' + packJson.version)

    runCmd('git', ['add', 'package.json'])
    var status = runCmd('git', ['status', '-s'])
    var changes = status
        .split(/\n/)
        .map((l) => l.trimEnd())
        .filter((l) => l != '')

    if (changes.every((l) => l.charAt(0) != ' ')) {
        var msgLines = message == undefined ? [] : [message]
        msgLines.push(`version bump to ${packJson.version}`)

        runCmd('git', ['commit', '-m', msgLines.join('\n')])
        console.log('[Publish] committed')
        runCmd('git', ['push'])
        console.log('[Publish] pushed')
    } else {
        console.log('[Publish] Unstaged changes present, skipping commit & push')
    }
}

async function publish() {
    var status = await runCmd('git', ['status', '-s'])
    var changes = status
        .split(/\n/)
        .map((l) => l.trimEnd())
        .filter((l) => l != '')
    if (changes.every((l) => l == '')) {
        console.log('[Publish] No changes, starting publish')
        await runCmd(/^win/i.test(process.platform) ? 'npm.cmd' : 'npm', [
            'publish',
            '--access',
            'public',
        ])
        console.log('[Publish] Package published')
    } else {
        console.error('[Publish] Changes present, skipping publish')
    }
}

checkArguments(argc, argv)
publish()
