const fs = require('fs');

const [filename] = process.argv.slice(2);

(() => {
  const titles = /\\question{(?<title>.*)}/g;
  const scriptures = /\\scripture{(?<scripture>.*)}/g;

  const file = fs.readFileSync(filename, 'utf8').toString();
  const withTitles = file.replace(titles, (_, title) => `## ${title}`);
  const withScriptures = withTitles.replace(scriptures, (_, scripture) => {
    const items = scripture
      .split(';')
      .map((t) => t.trim())
      .map((s) => `[${s}](https://www.biblegateway.com/passage/?search=${encodeURI(s)}&version=NIV)`)
      .join('; ');
    return `(${items})`;
  })

  fs.writeFileSync(filename, withScriptures);
})()
