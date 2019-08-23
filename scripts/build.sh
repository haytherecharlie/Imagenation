# Remove the build directory
rm -rf ./build && mkdir ./build

# Build JS Bundle
babel -d ./build ./src -s
