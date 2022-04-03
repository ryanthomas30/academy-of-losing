import { StandardPropertiesHyphen } from 'csstype'

const DefaultTransitionSpeed = 160
const FastTransitionSpeed = 80

type CssPropertyName = keyof StandardPropertiesHyphen

function transition(
	property: CssPropertyName = 'all',
	speed: number = DefaultTransitionSpeed,
): string {
	return `${property} ${speed}ms ease-in-out`
}

function transitionFast(property: CssPropertyName = 'all'): string {
	return transition(property, FastTransitionSpeed)
}

const DesktopMax = 1200
const SmallDesktopMax = 1024
const TabletMax = 768
const MobileMax = 480

const breakpoints = {
	desktop: DesktopMax,
	smallDesktop: SmallDesktopMax,
	tablet: TabletMax,
	mobile: MobileMax,
}

const mediaQuery = {
	desktop: `@media (min-width: ${SmallDesktopMax + 1}px)`,
	smallDesktop: `@media (max-width: ${SmallDesktopMax}px)`,
	tablet: `@media (max-width: ${TabletMax}px)`,
	mobile: `@media (max-width: ${MobileMax}px)`,
}

const Gray1 = '#1E1E1E'
const Gray2 = '#252526'
const Gray3 = '#333'
const Gray4 = '#444'
const Gray5 = '#555'
const White = '#D4D4D4'
const Blue = '#0E639C'
const BlueAlternate = '#1177BB'
const LightBlue = '#4Fc1FF'
const PaleBlue = '#9CDCFE'
const DarkBlue = '#569CD6'
const DarkOrange = '#CE9178'
const Purple = '#C586C0'
const DarkGreen = '#6A9955'
const Teal = '#4EC9B0'
const Yellow = '#DCDCAA'
const Red = '#E06767'

const color = {
	background: Gray1,
	foreground: Gray2,
	gray1: Gray1,
	gray2: Gray2,
	gray3: Gray3,
	gray4: Gray4,
	gray5: Gray5,
	white: White,
	blue: Blue,
	blueAlternate: BlueAlternate,
	lightBlue: LightBlue,
	paleBlue: PaleBlue,
	darkBlue: DarkBlue,
	darkOrange: DarkOrange,
	stringText: DarkOrange,
	purple: Purple,
	keywordText: Purple,
	darkGreen: DarkGreen,
	commentText: DarkGreen,
	teal: Teal,
	yellow: Yellow,
	red: Red,
}

export const theme = {
	color,
	borderRadius: '2px',
	transition,
	transitionFast,
	breakpoints,
	mediaQuery,
}
