//todo: dışarda type tanımlaması !
//todo: types !!!

export default async (handle: Function, customCatch: Function = () => {
}) => {
    try {
        console.log(handle)
        console.log(typeof handle);
        await handle();
    } catch (err: Object | unknown) {
        if (err) if (await customCatch(err)) return;
        console.log('bir hata oluştu')
        res.send('bir hat aşıldı')
    }
}
