<template>
    <div class="bitmap-editor-tip">
        <div class="bubble">
            <div class="icon"><i class="fas fa-info-circle"></i></div>
            <div><slot></slot></div>
        </div>
        <div class="tail"></div>
    </div>
</template>

<style>
.bitmap-editor-tip {
    font-size: var(--vue-bitmap-editor-font-size);
    display: inline-block;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 3rem;
    width: 200px;
    color: #000;
}

.bitmap-editor-tip,
.bitmap-editor-tip * {
    box-sizing: border-box;
}

.bitmap-editor-tip .bubble,
.bitmap-editor-tip .tail {
    background-color: var(--vue-bitmap-editor-tip-background);
}

.bitmap-editor-tip .bubble {
    border-radius: 10px;
    padding: 8px;
    border: 1px solid black;
    display: flex;
    gap: 8px;
}

.bitmap-editor-tip .icon {
    float: left;
    font-size: var(--vue-bitmap-editor-tip-icon-size);
    color: var(--vue-bitmap-editor-tip-icon-color);
}

.bitmap-editor-tip .tail {
    height: 14px;
    width: 14px;
    position: absolute;
    bottom: -7px;
    left: 40px;
    transform: rotate(45deg);
    border-right: 1px solid black;
    border-bottom: 1px solid black;
}

.bitmap-editor-tip .bubble u {
    font-family: monospace;
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    padding: 2px;
}
</style>
