const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');
const config = require('./playwright.config');

/* Learn more about service configuration at https://aka.ms/pww/docs/config */
export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000, // 3 minutes
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
  {
    
    /*
    Enable Playwright Workspaces Reporter:
    Uncomment the reporter section below to upload test results and reports to Playwright Workspaces.

    Note: The HTML reporter must be included before Playwright Workspaces Reporter.
    This configuration will replace any existing reporter settings from your base config.
    If you're already using other reporters, add them to this array.
    */
    reporter: [
    ["html", { open: "never" }],
    ["@azure/playwright/reporter"],
     ],

    
  }
);

// azure
    // user id: "6d6de4f9-fb99-45fe-8d4b-6a340567f7de"
    // storage id: pwstrgfinance991a
    // resource group: Finance
    /*
    step 4 command:
    az role assignment create `
      --assignee "6d6de4f9-fb99-45fe-8d4b-6a340567f7de" `
      --role "Storage Blob Data Contributor" `
      --scope (az storage account show --name pwstrgfinance991a --resource-group finance --query id -o tsv)
    */
