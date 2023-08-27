import useIcd from "./icd/hooks/useIcd"

export const HomePage = () => {
    const [data] = useIcd()
    console.log(data)
  return (
    <div>
      Home
    </div>
  )
}
