#!/bin/bash
python -m uvicorn main:app --reload
cd show
npm start
