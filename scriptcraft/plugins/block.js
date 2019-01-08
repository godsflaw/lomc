function block(type, cube) {
  if (type === 0 || type === 'empty') {
    down().box(0, cube, cube, cube);
  } else {
    down().box(blocks[type], cube, cube, cube);
  }
}

exports.block = block;
