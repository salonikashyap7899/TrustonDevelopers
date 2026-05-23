import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:5000');

    // Wait for content to load and animations to trigger
    await page.waitForTimeout(8000);

    // Check for Video
    const videoCount = await page.locator('video').count();
    console.log('Video count:', videoCount);

    // Check for "Who We Are"
    const whoWeAre = page.getByText('Who We Are', { exact: false });
    const whoWeAreVisible = await whoWeAre.isVisible();
    console.log('Who We Are visible:', whoWeAreVisible);

    // Check for "Building Plots & Structures"
    const plots = page.getByText('Building Plots', { exact: false });
    const plotsVisible = await plots.isVisible();
    console.log('Plots visible:', plotsVisible);

    // Take screenshot
    await page.screenshot({ path: 'verification.png', fullPage: true });

  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();
