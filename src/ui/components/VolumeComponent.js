import React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'

export default (props) => {
    const { 
        title,  
        authors, 
        smallThumbnail, 
        description, 
        publishedDate,
        price,
        currency,
        isForSale,
        isFree,
        Ref } = props

    return (
    <div className="volume-container" ref={Ref}>
        <div className="img-container">
            { smallThumbnail ? <img src={smallThumbnail} alt=""/> : <img src="book.png" alt=""/>}
        </div>
        <div className="additional-info-container">
            <h2><LinesEllipsis text={title} maxLine='2' ellipsis='...' trimRight basedOn='letters'/></h2>
            <h4 className="h4-description">
                <LinesEllipsis text={ description ? description : "Brak Opisu"} maxLine='2'   ellipsis='...' trimRight basedOn='letters'/>
            </h4>
            <h4 id="autors">
                {
                    authors && authors.length === 1 ? "Autor: " : "Autorzy: "
                }
                {
                    authors && authors.map(author => author)
                }
            </h4>
            <h4>
                {
                    publishedDate && "Data wydania: " + publishedDate
                }
            </h4>
            <div className="price">
                {
                    isForSale ? isFree ? <h2 id="free">Darmowe</h2> : <h2 id="for-sale" >
                    Cena: {price} {currency}
                </h2> :
                    <p id="not-for-sale" >Nie na sprzedaż</p>
                }
            </div>

        </div>  
    </div>)
}