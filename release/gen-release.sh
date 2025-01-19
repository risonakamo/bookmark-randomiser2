set -exu
HERE=$(dirname $(realpath $BASH_SOURCE))
cd $HERE

# --- config
version=1.0.0
# --- end

outputDir=$HERE/output/bookmark-random-v2_$version

rm -rf $outputDir
mkdir -p $outputDir

cd $HERE/..
rm -rf build
pnpm b
cp -r build doc manifest.json $outputDir

echo "done"