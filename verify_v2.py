import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        try:
            # Increase timeout and wait for network idle
            await page.goto("http://localhost:5000", wait_until="networkidle", timeout=60000)

            # Take screenshots of the sections
            await page.screenshot(path="full_page_v2.png", full_page=True)

            # Hero
            hero = page.locator("section").first
            await hero.screenshot(path="hero_v2.png")

            # Who We Are
            who_we_are = page.locator("section:has-text('Who We Are')")
            if await who_we_are.count() > 0:
                await who_we_are.screenshot(path="who_we_are_v2.png")

            # Plots
            plots = page.locator("section:has-text('Building Plots')")
            if await plots.count() > 0:
                await plots.screenshot(path="plots_v2.png")

            print("Screenshots saved successfully.")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
