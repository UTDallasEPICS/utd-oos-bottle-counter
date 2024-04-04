export default function Fountain(props:any) {
  return (
  <div className="fountain">
    <p className="fountainName">{props.name}</p>
    <p className="fountainCount">{props.count}</p>
  </div>
  )
}