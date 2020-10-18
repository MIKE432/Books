export const baseUrl = "https://www.googleapis.com/books/v1/volumes";

export const languages = {
    "Wybierz Język": "",
    Polski: "pl",
    Angielski: "en",
    Włoski: "it",
    Hiszpański: "es",
    Portugalski: "pt",
    Niemiecki: "de",
    Rosyjski: "ru",
    Francuski: "fr",
    Fiński: "fi",
    Szwedzki: "sv",
    Słowacki: "sl",
    Norweski: "no",
}

export const elementsPerPage = 10

export const mapBookToViewModel = (book) => {
    if(!(book || book.volumeInfo))
        return undefined
    const volumeInfo = book.volumeInfo
    const saleInfo = book.saleInfo
    return {
        title: volumeInfo.title,
        subtitle: volumeInfo.subtitle,
        authors: volumeInfo.authors,
        smallThumbnail: volumeInfo.imageLinks && volumeInfo.imageLinks.smallThumbnail,
        language: volumeInfo.language,
        description: volumeInfo.description,
        publishedDate: volumeInfo.publishedDate,
        price: saleInfo && saleInfo.listPrice && saleInfo.retailPrice.amount,
        currency: saleInfo && saleInfo.listPrice && saleInfo.retailPrice.currencyCode,
        buyLink: saleInfo && saleInfo.buyLink,
        isForSale: saleInfo && saleInfo.saleability !== 'NOT_FOR_SALE',
        isFree: saleInfo && saleInfo.saleability === 'FREE'
    }
}

export const smallDeviceBreakPoint = 576