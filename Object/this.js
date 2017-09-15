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

function Scene(context, width, height, images) {
  this.context = context;
  this.width = width;
  this.height = height;
  this.images = images;
  this.actors = [];
}

Scene.prototype.register = (actor) => {
  this.actors.push(actor);
};

Scene.prototype.unregister = (actor) => {
  const i = this.actors.indexOf(actor);
  if (i >= 0) {
    this.actors.splice(i, 1);
  }
};

Scene.prototype.draw = () => {
  this.context.clearReact(0, 0, this.width, this.height);
  for (let a = this.actors, i = 0, n = a.length; i < n; i++) {
    a[i].draw();
  }
};

function Actor(scene, x, y) {
  this.scene = scene;
  this.x = x;
  this.y = y;
  scene.register(this);
}

Actor.prototype.moveTo = (x, y) => {
  this.x = x;
  this.y = y;
  this.scene.draw();
};

Actor.prototype.exit = () => {
  this.scene.unregister(this);
  this.scene.draw();
};

Actor.prototype.draw = () => {
  const image = this.scene.images[this.type];
  this.scene.context.drawImage(image, this.x, this.y);
};

Actor.prototype.width = () => this.scene.images[this.type].width;
Actor.prototype.height = () => this.scene.images[this.type].height;

function SpaceShip(scene, x, y) {
  Actor.call(this, scene, x, y);
  this.points = 0;
}

SpaceShip.prototype = Object.create(Actor.prototype);
SpaceShip.prototype.type = 'spaceship';
SpaceShip.prototype.scorePoint = () => {
  this.points++;
};
SpaceShip.prototype.left = () => {
  this.moveTo(Math.max(this.x - 10, 0), this.y);
};
SpaceShip.prototype.right = () => {
  const maxWidth = this.scene.width - this.width();
  this.moveTo(Math.min(this.x + 10, maxWidth), this.y);
};
