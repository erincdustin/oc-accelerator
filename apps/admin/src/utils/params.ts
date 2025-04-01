export const ToParameterKey = (s?: string): string => {
    return s ? s.charAt(0).toLowerCase() + s.slice(1) : ''
  }