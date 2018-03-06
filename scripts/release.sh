#!/bin/bash

releaseType=$1

version=$(node ./scripts/bumpVersion.js ${releaseType})

git flow release start ${version}

git commit -a -m "chore: bump version to ${version}"

conventional-changelog -p angular -i CHANGELOG.md -s -k ./app/package.json

git commit -a -m 'chore: update CHANGELOG'

git flow release publish ${version}

echo 'done!'