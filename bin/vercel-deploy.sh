#!/bin/bash

# Check if the branch is "dev" or "main" and allow the build
if [[ "$VERCEL_GIT_COMMIT_REF" != "dev" && "$VERCEL_GIT_COMMIT_REF" != "main" ]]; then
  echo "Skipping build for non 'dev' and 'main' branch."
  exit 0
fi

# Check if the commit author is "renovate[bot]" and skip the build
if [[ "$VERCEL_GIT_COMMIT_AUTHOR_LOGIN" == "renovate[bot]" ]]; then
  echo "Skipping build for commit by renovate[bot]."
  exit 0
fi

# Check if the commit message contains "renovate" or follows Conventional Commits for "ci" and "chore"
if echo "$VERCEL_GIT_COMMIT_MESSAGE" | grep -Eiq "(renovate|^ci:|^chore:|^ci\(.+\):|^chore\(.+\):)"; then
  echo "Skipping build for commit message containing 'renovate' or matching 'ci:'/'chore:' patterns."
  exit 0
fi

# If none of the conditions match, proceed with the build
echo "Proceeding with the build."
exit 1