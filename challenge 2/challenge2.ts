
const compare = (a: { name: string; bid: number }, b: { name: string; bid: number }) => {
    if (a.bid < b.bid) {
        return 1;
    }
    if (a.bid > b.bid) {
        return -1;
    }
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
}
const generalizedSecondPriceAuction = (itemCount: number, bidders: { name: string; bid: number }[]) => {

    bidders.sort(compare);
    let bids = bidders.map(b => b.bid);
    let uniqueBids = [...new Set(bids)];

    for (let i = 1; i < uniqueBids.length; i++) {
        bidders[i - 1].bid = uniqueBids[i];
    }

    for (let i = uniqueBids.length - 1; i < bidders.length; i++) {
        bidders[i].bid = uniqueBids[uniqueBids.length - 1];
    }
    let result = [];
    for (let i = 0; i < itemCount; i++) {
        result.push(bidders[i])
    }
    for (let i = itemCount; i < bidders.length; i++) {
        result.push({
            name: bidders[i].name,
            bid: 'LOST'
        })
    }
    return result;
}

console.log(generalizedSecondPriceAuction(3, [

    {
        name: 'John Smith',
        bid: 100
    },
    {
        name: 'John Doe',
        bid: 500
    },
    {
        name: 'Sara Conor',
        bid: 280
    },
    {
        name: 'Martin Fowler',
        bid: 320
    }
]));