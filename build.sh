#!/bin/bash
export NODE_ENV=production
npm run-script build && npm run-script build-web
