"""Build, serve, and rebuild when source files change; Python 3.10+."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
import time

from build import ROOT, OUT, build


def source_state():
    paths = [ROOT / 'site.yml']
    for folder in ['templates', 'assets', '_pages', '_news', '_data', '_bibliography']:
        paths.extend(path for path in (ROOT / folder).rglob('*') if path.is_file())
    return {str(path): path.stat().st_mtime_ns for path in paths}


def watch():
    previous = source_state()
    while True:
        time.sleep(1)
        current = source_state()
        if current != previous:
            try:
                build()
                print('Rebuilt — refresh your browser.', flush=True)
            except Exception as error:
                print('Build failed: %s' % error, flush=True)
            previous = current


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--host', default='127.0.0.1')
    parser.add_argument('--port', default=8080, type=int)
    args = parser.parse_args()
    build()
    handler = partial(SimpleHTTPRequestHandler, directory=str(OUT))
    server = ThreadingHTTPServer((args.host, args.port), handler)
    Thread(target=watch, daemon=True).start()
    print('Preview: http://%s:%d (source changes rebuild automatically)' % (args.host, args.port), flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
