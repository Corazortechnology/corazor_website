#!/bin/bash
echo "Checking pages..."
echo ""
echo "Homepage:"
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:3000/
echo ""
echo "Case Studies:"
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:3000/case-studies
echo ""
echo "About:"
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:3000/about
