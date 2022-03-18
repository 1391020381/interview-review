(async function () {

    await new Promise((resolve) => setTimeout(() => { console.log(`async end`); resolve() }, 1000));

    console.log('e');
})()