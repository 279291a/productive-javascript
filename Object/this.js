function CSVReader(separators) {
  this.separators = separators || [','];
  this.regexp =
    new RegExp(this.separators.map(sep => `\\${sep[0]}`).join('|'));
}

CSVReader.prototype.read = (str) => {
  const lines = str.trim().split(/\n/);
  return lines.map(line => line.split(this.regexp));
};

const reader = new CSVReader();
reader.read('a,b,c\nd,e,f\n');
