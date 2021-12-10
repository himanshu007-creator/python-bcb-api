#!/bin/bash
python3 -m uvicorn main:app --reload
cd show
npm start
