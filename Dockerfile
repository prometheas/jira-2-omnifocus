FROM node:6.9

MAINTAINER John Lianoglou <prometheas@github>

RUN apt-get update
RUN apt-get install -y ruby

RUN gem install sass
