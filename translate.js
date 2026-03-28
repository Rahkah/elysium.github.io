const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const fm = require('front-matter');
const { glob } = require('glob');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
});

async function translateContent(content, targetLang = 'English') {
  // Hugo front-matter usually uses +++ (TOML) or --- (YAML)
  const isToml = content.trimStart().startsWith('+++');
  const { attributes, body } = fm(content);
  
  if (!body || body.trim().length === 0) return content;

  const prompt = `
    You are a professional translator. Translate the following Hugo Markdown content into ${targetLang}.
    Requirements:
    1. Keep the original Front Matter format (the part between +++ or ---).
    2. Translate the values of keys like "title", "description", "teaser", "introTitle", "introBody" in the Front Matter.
    3. DO NOT translate technical keys like "date", "image", "url", "listIcon", "watchingUrl".
    4. Translate the main body text accurately while maintaining the Markdown formatting.
    5. Return ONLY the translated content in the same Hugo Markdown format.

    Content to translate:
    ${content}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.MODEL_NAME || "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });
    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error('Translation API error:', err.message);
    return null;
  }
}

async function run() {
  // Find all .zh-cn.md files
  const files = await glob('content/**/*.zh-cn.md');

  for (const file of files) {
    const enFile = file.replace(/\.zh-cn\.md$/, '.en.md');
    
    // Skip if English version already exists
    if (fs.existsSync(enFile)) {
      console.log(`Skipping ${file}, English version already exists.`);
      continue;
    }

    console.log(`Translating ${file} -> ${enFile}...`);
    const content = fs.readFileSync(file, 'utf8');
    const translated = await translateContent(content);
    
    if (translated) {
      fs.writeFileSync(enFile, translated);
      console.log(`Successfully translated ${file}`);
    }
  }
}

run();