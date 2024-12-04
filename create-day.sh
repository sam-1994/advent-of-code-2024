DAY_COUNT=$1

if [ -z "$DAY_COUNT" ]; then
  echo "Please provide a day number"
  exit 1
fi

DAY=day$DAY_COUNT
DIR=challenges/$DAY

nx g @nx/node:application --name=$DAY --directory=$DIR --bundler=webpack --e2eTestRunner=none --no-interactive

rm $DIR/src/main.ts
sed "s/XX/${DAY_COUNT}/g" template/dayXX.spec.ts > $DIR/src/day${DAY_COUNT}.spec.ts
sed "s/XX/${DAY_COUNT}/g" template/dayXX_1.ts > $DIR/src/day${DAY_COUNT}_1.ts
sed "s/XX/${DAY_COUNT}/g" template/dayXX_2.ts > $DIR/src/day${DAY_COUNT}_2.ts
sed "s/XX/${DAY_COUNT}/g" template/main.ts > $DIR/src/main.ts

