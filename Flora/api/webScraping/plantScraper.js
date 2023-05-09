/**
 * @author Sami Cemek
 * @version 1.0
 * @date 04/25/23
 * 
 */

const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp",
    });

    const page = await browser.newPage();
    await page.goto("https://www.bhg.com/gardening/plant-dictionary/bulb/allium/");


    const plantName = await page.waitForSelector('#mntl-sc-block_1-0-6 > table', { timeout: 10000 });

    let i = 0;
    let plants = [];

    (async () => {
        const browser = await puppeteer.launch();

        const urls = [
            "https://www.bhg.com/gardening/plant-dictionary/bulb/allium/",
            "https://www.bhg.com/gardening/plant-dictionary/vegetable/arugula/"
            
        ];

        for (const url of urls) {

            const page = await browser.newPage();
            await page.goto(url, { waitUntil: "domcontentloaded" });

            //let plantFeatures = "Null";
            // try{
            //     plantFeatures = await page.evaluate(
            //         (el) => el.querySelector("tr > td.mntl-sc-block-profile__value").textContent, url
            //     );
            //     console.log(plantFeatures);
            // }catch(error){}

            const plantFeatures = await page.$$eval(
                "tr > td.mntl-sc-block-profile__value",
                els => els.map(el => el.textContent)
            );
            console.log(plantFeatures);

            if (plantFeatures !== "Null") {
                plants.push({ plantFeatures });
            }

            await page.close();

        }
    })()
        .catch(err => console.error(err))
        .finally(() => browser?.close());

    //console.log(plants);
    await browser.close();

})();