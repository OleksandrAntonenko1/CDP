let count = 1;
if (true) {

  count += 1;

}


const atom = {
  value: 1,

  addValue (value) {

    return atom.value + value;
  
  },
};

const bad = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};

const name = 'Capt. Janeway';

function sayHi (name) {

  return `How are you, ${name}?`;

}

const f = function () {};
const g = function () {};
const h = function () {};

function test () {

  console.log('test');

}

if (isJedi) {

  fight ();

}

// "prefer-spread": "error" - rule is enabled, don't know how to
// fix it in this case(working in other cases)
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

function foo2 (
  bar,
  baz,
  quux
) {
  // ...
}

[1, 2, 3].map((x) => {

  const y = x + 1;
  return x * y;

});

foo2(() => bool = true);

const foo3
    = 'superLongLongLongLongLongLongLongLongString';

if ([0] && []) {
  // true
  // an array (even an empty one) is an object, objects will evaluate to true
}

const foo5 = a ? a : b;
const bar10 = !!c;
const baz11 = !c;

function cats () {

  if (x) {

    return x;
  
  } else if (y) {

    return y;
  
  }

}

// is current tab
const active = true;

if (isJedi) {

  fight ();

}

const x = y + 5;

const leds = stage.selectAll('.led').data(data)
  .enter()
  .append('svg:svg')
  .classed('led', true)
  .attr('width', (radius + margin) * 2)
  .append('svg:g')
  .attr('transform', `translate(${radius + margin},${radius + margin})`)
  .call(tron.led);

function bar () {

  console.log(foo);

}

function bar2 (foo) {

  return foo;

}

const foo1 = [1, 2, 3];
console.log(foo[ 0 ]);

const baz = { clark: 'kent' };

const story = [
  once,
  upon,
  aTime,
];

function foo () {

  return false; 

}

if (test) {

  thing1();
  thing2();

} else {

  thing3();

}

const hero = {
  firstName: 'Dana',
  lastName: 'Scully',
};