// untuk memisahkan nominal menggunakan metode regex
const pemisahNominal = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const numberFormat = new Intl.NumberFormat('id-ID')

export const Column_User_Transaction_History = [
    {
        Header: 'Tanggal',
        accessor: 'created_at',
        Cell: row => (
            <span>
                {new Date(row.value).toLocaleDateString()+ ' ' + new Date(row.value).toLocaleTimeString()}
            </span>
        ),
    },
    {
        Header: 'Nama Transaksi',
        accessor: 'transaction_name'
    },
    {
        Header: 'Jumlah',
        accessor: 'amount',
        Cell: row => (
            <span>
                Rp. {pemisahNominal(row.value)}
            </span>
        ),
    },
    {
        Header: 'Kategori',
        accessor: 'category',
    },
    {
        Header: 'Tipe',
        accessor: 'type',
        Cell: row => (
            <span>
                {
                    row.value === 1 ? 'TopUp & Tarik Saldo' :
                    (row.value === 2 ? 'Transfer Saldo' :
                    (row.value === 3 ? 'Terima Pembayaran' :
                    (row.value === 4 ? 'IRS(Pulsa)' :
                    (row.value === 5 ? 'IRS(PLN)' :
                    (row.value === 6 ? 'IRS(E-Wallet)' :
                    (row.value === 7 ? 'IRS(Voucer Game)' :
                    (row.value === 8 ? 'Bayar Kuliah': 'Tipe Tidak Dikenali'
                    )))))))
                }
            </span>
        ),
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: row => (
            <span className={`py-2 rounded-lg text-current ${row.value === "1" ? 'bg-success px-[17px]' : (row.value === "2" ? 'bg-gray-400 px-4' : 'bg-error px-[22px]')}`}>
              {row.value === "1" ? 'Success' : (row.value === "2" ? 'Pending' : 'Failed')}
            </span>
        ),
    },
    {
        Header: 'No Referensi',
        accessor: 'no_ref',
    },
]

export const Column_Product = [
    {
        Header: 'Kode Produk',
        accessor: 'product_code',
    },
    {
        Header: 'Nama Produk',
        accessor: 'product_name'
    },
    {
        Header: 'Harga Dasar',
        accessor: 'harga_dasar',
        Cell: row => (
            <span>
            Rp {numberFormat.format(row.value)}
            </span>
        ),
    },
    {
        Header: 'Harga Jual',
        accessor: 'harga_jual',
        Cell: row => (
            <span>
            Rp {numberFormat.format(row.value)}
            </span>
        ),
    },
    {
        Header: 'Cashback',
        accessor: 'cashback',
        Cell: row => (
            <span>
            Rp {numberFormat.format(row.value)}
            </span>
        ),
    },
    {
        Header: 'Status',
        accessor: 'status',
        Cell: row => (
            <span className={`px-4 py-2 rounded-lg text-current ${row.value ? 'bg-success' : 'bg-error'}`}>
              {row.value ? 'Active' : 'Inactive'}
            </span>
        ),
    },
    {
        Header: 'Deskripsi Produk',
        accessor: 'product_description',
    },
]

// export const Column_Bank = [
//     {
//         Header: 'ID',
//         accessor: 'id',
//     },
//     {
//         Header: 'Kode Bank',
//         accessor: 'code'
//     },
//     {
//         Header: 'Nama Bank',
//         accessor: 'name'
//     },
// ]
