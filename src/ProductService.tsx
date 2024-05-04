export const ProductService = {
    getProductsData() {
        return [
            {
                id: '1000',
                code: 'E200',
                college_name: 'RVCE',
                category: '3BG',
                cutoff_rank: '2001',
                allocation_round: 'Round 1',
                year: 2023,
            },
            {
                id: '1001',
                code: 'E201',
                college_name: 'BMSCE',
                category: '3BG',
                cutoff_rank: '2001',
                allocation_round: 'Round 1',
                year: 2023,
            },
            {
                id: '1000',
                code: 'E202',
                college_name: 'DSCE',
                category: '3BG',
                cutoff_rank: '2001',
                allocation_round: 'Round 1',
                year: 2023,
            },

        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

};

