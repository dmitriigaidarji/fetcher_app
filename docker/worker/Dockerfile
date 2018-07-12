FROM python:3

RUN PHANTOMJS_VERSION=2.1.1 && \
    PHANTOMJS_PLATFORM=linux-x86_64 && \
    wget -q https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-${PHANTOMJS_VERSION}-${PHANTOMJS_PLATFORM}.tar.bz2 && \
    echo "86dd9a4bf4aee45f1a84c9f61cf1947c1d6dce9b9e8d2a907105da7852460d2f *phantomjs-${PHANTOMJS_VERSION}-${PHANTOMJS_PLATFORM}.tar.bz2" > phantomjs.sha256 && \
    sha256sum --check phantomjs.sha256 && \
    rm -f phantomjs.sha256 && \
    mkdir -p /usr/local/phantomjs-${PHANTOMJS_VERSION} && \
    tar -xjf phantomjs-${PHANTOMJS_VERSION}-${PHANTOMJS_PLATFORM}.tar.bz2 -C /usr/local/phantomjs-$PHANTOMJS_VERSION && \
    ln -s /usr/local/phantomjs-${PHANTOMJS_VERSION}/phantomjs-${PHANTOMJS_VERSION}-${PHANTOMJS_PLATFORM}/bin/phantomjs /usr/local/bin/phantomjs && \
    rm -f phantomjs-${PHANTOMJS_VERSION}-${PHANTOMJS_PLATFORM}.tar.bz2

ADD ./src /code
WORKDIR /code
RUN pip install --upgrade pip
RUN pip install -r requirements.txt