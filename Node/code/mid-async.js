(async () => {

    console.log('a');

    (async () => { // await  执行函数没有严格按照  async await 。 一旦其中一个没有 按照async await执行 就会导致执行结果和预想的不一样。

        console.log('b');

        (async () => {

            console.log('c');

            console.log('d');

        })();

        await new Promise((resolve) => setTimeout(() => { console.log(`async end`); resolve() }, 1000));

        console.log('e');

    })();

    console.log('f');

})();
