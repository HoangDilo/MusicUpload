
export default function Selection({value, onclick}) {
    return (
        <span className="selections-child" onClick={(event) => onclick(event)}>
            {value}
        </span>
    )
}