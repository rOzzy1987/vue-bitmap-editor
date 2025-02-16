export type SupportedLanguage = 'en' | 'hu'

export interface ILabels {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    f(label: string, ...args: any[]): string
    pixel_tip1: string
    pixel_tip2: string
    toolbox_pin_unpin: string
    toolbox_color_white: string
    toolbox_color_black: string
    toolbox_color_invert: string
    toolbox_pen_s_square: string
    toolbox_pen_m_square: string
    toolbox_pen_l_square: string
    toolbox_pen_s_circle: string
    toolbox_pen_m_circle: string
    toolbox_pen_l_circle: string
    toolbox_tool_fill: string
    toolbox_tool_pen: string
    toolbox_zoom_in: string
    toolbox_zoom_out: string
}
