/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

export function CardIsitRainingMore(props) {
    return <article>
        <h1>{props.isRainMore}</h1>
        <div className="grid">
            <div>Recently it Rained { } Inches</div>
            <div>A year ago it rained { } Inches</div>
        </div>
        <div className="grid">
        </div>
    </article>

}
