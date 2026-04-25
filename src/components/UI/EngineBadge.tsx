import { IconZap } from './Icons'

type Size = 'sm' | 'md' | 'lg'

interface Props { size?: Size }

const sizeMap: Record<Size, { wrap: string; icon: number }> = {
  sm: { wrap: 'w-6 h-6 rounded-md',  icon: 12 },
  md: { wrap: 'w-[30px] h-[30px] rounded-lg', icon: 15 },
  lg: { wrap: 'w-[38px] h-[38px] rounded-xl', icon: 20 },
}

export function EngineBadge({ size = 'md' }: Props) {
  const { wrap, icon } = sizeMap[size]
  return (
    <span className={`inline-flex items-center justify-center shrink-0 bg-gradient-to-br from-brand-600 to-brand-500 text-white ${wrap}`}>
      <IconZap size={icon} />
    </span>
  )
}
