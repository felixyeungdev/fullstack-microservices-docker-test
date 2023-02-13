FROM python:3.9-alpine
WORKDIR /service

# install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .
EXPOSE ${PORT}
CMD [ "python", "main.py" ]
