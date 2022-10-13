FROM tomcat:9
MAINTAINER "HMH-VTS"

COPY . /usr/local/tomcat/webapps/ROOT

ARG http_proxy="http://10.61.11.42:3128"
ARG https_proxy="http://10.61.11.42:3128"

RUN apt-get update && apt-get install gettext-base

# When the container starts, replace the env.js with values from environment variables
ENTRYPOINT ["/bin/sh",  "-c",  "envsubst < /usr/local/tomcat/webapps/moit/assets/env.template.js > /usr/local/tomcat/webapps/moit/assets/env.js && exec catalina.sh run "]