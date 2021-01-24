/*
    2006-30-84
    Leeroy was here!!
    
    Leeroy <lerooy@example.com>
*/

let items = [];

const GildedRose = function () {

  items.push(new Item("+5 Dexterity Vest", 10, 20));
  items.push(new Item("Aged Brie", 2, 0));
  items.push(new Item("Elixir of the Mongoose", 5, 7));
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 30));
  items.push(new Item("Conjured Mana Cake", 3, 6));

  // This loop is just for showing in console what would happen in a 20 days period of time
  for (let i = 0; i < 20; i++) {
    items = GildedRose.updateQuality(items);
    console.log('After', i + 1, 'day(s)');
    for (let j = 0; j < 6; j++) {
      console.log(items[j]);
    }
  }
};

const updateAgedBrie = (item) => {
  // The Quality of an item is never more than 50
  if (item.quality < 50) {
    // "Aged Brie" actually increases in Quality the older it gets.
    item.quality = item.quality + 1
  }
  item.sellIn = item.sellIn - 1;

  return item;
}

const updateBackstagePasses = (item) => {
  if (item.sellIn <= 0) {
    // Quality drops to 0 after the concert.
    item.quality = 0;
  } else if (item.sellIn <= 5) {
    // Quality increases by 3 when there are 5 days or less
    item.quality = item.quality + 3;
  } else if (item.sellIn <= 10) {
    // Quality increases by 2 when there are 10 days or less
    item.quality = item.quality + 2;
  } else {
    // It increases by one in Quality as it's SellIn value approaches
    item.quality = item.quality + 1;
  }

  if (item.quality > 50) {
    // The Quality of an item is never negative.
    item.quality = 50
  }

  item.sellIn = item.sellIn - 1;
  return item;
}


const updateLegendary = (item) => {
  item.sellIn = item.sellIn - 1;
  return item;

}

const updateConjured = (item) => {
  // The Quality of an item is never negative.
  if (item.quality > 0) {
    // "Conjured" items degrade in Quality twice as fast as normal items
    item.quality = item.quality - 2
  }
  item.sellIn = item.sellIn - 1;

  return item;

}

const updateCommonItems = (item) => {
  item.sellIn = item.sellIn - 1;
  if (item.sellIn >= 0) {
    item.quality = item.quality - 1;
  } else {
    // Once the sell by date has passed, Quality degrades twice as fast.
    item.quality = item.quality - 2;
  }
  if (item.quality < 0) {
    // The Quality of an item is never negative.
    item.quality = 0
  }
}

GildedRose.updateQuality = function (items) {
  items.map(item => {
    if (item.name === 'Aged Brie') {
      updateAgedBrie(item);
    } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      updateBackstagePasses(item);
    } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
      updateLegendary(item);
    } else if (item.name.includes('Conjured')) {
      updateConjured(item);
    } else {
      updateCommonItems(item);
    }
  })
  return items;
};

GildedRose();