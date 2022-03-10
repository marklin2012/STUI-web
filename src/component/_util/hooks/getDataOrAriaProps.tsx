export default function getDataOrAriaProps(props: any) {
  return Object.keys(props).reduce((prev: any, key: string) => {
    if (
      (key.substring(0, 5) === 'data-' || key.substring(0, 5) === 'aria-' || key === 'role') &&
      key.substring(0, 7) !== 'data-__'
    ) {
      prev[key] = props[key]
    }
    return prev
  }, {})
}
