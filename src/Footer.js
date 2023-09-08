const Footer = ({listCount}) => {


    return (
        <footer>
            <p>{listCount} {listCount ===1 ? "item" : "items"} in the List </p>
        </footer>
    )
}

export default Footer