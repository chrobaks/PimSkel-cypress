#!/bin/bash

while getopts p:f: flag
do
    case "${flag}" in
        p) path=${OPTARG};;
        f) file=${OPTARG};;
        *) echo "usage: $0 [-v] [-r]" >&2
           exit 1 ;;
    esac
done

declare -A TEST_PATH

TEST_PATH["products.add"]="./cypress/e2e/products/formAddProduct.cy.js"
TEST_PATH["products.edit"]="./cypress/e2e/products/formEditProduct.cy.js"
TEST_PATH["products.delete"]="./cypress/e2e/products/formDeleteProduct.cy.js"

PATH_KEY="${path}.${file}"

PATH_TO_TEST=${TEST_PATH[$PATH_KEY]}

echo "$PATH_TO_TEST"
if [[ -z $PATH_TO_TEST ]]; then
  echo "Error: Test path not found for $PATH_KEY"
  exit 1
fi

docker run -it --network="host" -v "$PWD":/cypress/e2e -w /cypress/e2e cypress/included:12.8.1 run --browser electron --spec "$PATH_TO_TEST" --config-file cypress.config.js
