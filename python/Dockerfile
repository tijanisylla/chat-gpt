FROM python:3.7
WORKDIR /python
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5050
COPY . .
CMD ["gunicorn", "wsgi:app", "-w 2", "-b 0.0.0.0:5050", "-t 30"]