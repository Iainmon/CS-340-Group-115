const fs = require('fs');

const dump = require('./dump.json');
console.log(dump);
const tables = {};

for (const d of dump) {
    if (d['type'] === 'table') {
        if (d['name'] === 'diagnostic') { continue; }
        tables[d['name']] = d['data'].map(r => ({...r}));
    }
}
for (const table of Object.values(tables)) {
    console.log(table);
    console.table(table);
}

const compileTableDefinition = (tableName,rows) => `const table = ${JSON.stringify({ name: tableName, rows: rows })};`;

const expandMacro = (template,macroName,macroValue) => template.replaceAll(`{{${macroName}}}`,macroValue);

for (const [tableName,rows] of Object.entries(tables)) {
    const tableDefinition = compileTableDefinition(tableName,rows);
    const templateFile = fs.readFileSync(`./template.html`, 'utf8');
    const expandedTemplate = expandMacro(templateFile,'tableDef',tableDefinition);
    fs.writeFileSync(`./out/${tableName}.html`, expandedTemplate, 'utf8');
    console.log('Witting',`./out/${tableName}.html`);
}