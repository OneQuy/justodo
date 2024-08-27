import { WindowSize_Min } from "../../Common/CommonConstants";

export const FontBold = {
    Bold: '500',
    BoldMore: '700',
} as const

export const FontSize = {
    Small: WindowSize_Min * 0.035,
    Normal: WindowSize_Min * 0.045,
    Medium: WindowSize_Min * 0.065,
    Big: WindowSize_Min * 0.09,
} as const