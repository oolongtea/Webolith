# an attempt to build an SSL renewer. We should probably use lego
# but that requires another nginx ingress controller.

# sudo apt-get install fabric python-yaml  # on the machine first.

import base64
import yaml
import sys
from fabric.api import sudo, task, local

secret_template = """
apiVersion: v1
data:
  tls.crt:
  tls.key:
kind: Secret
metadata:
  name: tls-secret
type: Opaque
"""


@task
def regen(regid):
    key_file = '/etc/letsencrypt/archive/aerolith.org/privkey{0}.pem'.format(
        regid)
    crt_file = '/etc/letsencrypt/archive/aerolith.org/fullchain{0}.pem'.format(
        regid)
    create_ssl_secret(key_file, crt_file)


@task
def renew():
    pass


def create_ssl_secret(key_file, crt_file):
    with open(key_file) as f:
        contents = f.read()
    enc_key = base64.b64encode(contents)
    with open(crt_file) as f:
        contents = f.read()
    enc_crt = base64.b64encode(contents)
    template = yaml.load(secret_template)
    template['data']['tls.crt'] = enc_crt
    template['data']['tls.key'] = enc_key
    with open('secret-tls.yaml', 'wb') as f:
        f.write(yaml.dump(template, default_flow_style=False))


if __name__ == '__main__':
    if len(sys.argv) == 1:
        print 'Usage'
        print 'fab -f ssl-renewer.py <mode>'
        print '  modes:'
        print 'renew - Run script to renew cert'
        print 'regen - Run script to regenerate secret template'
        sys.exit(1)
    if sys.argv[1] == 'renew':
        renew()
    elif sys.argv[1] == 'regen':
        regen(sys.argv[2])
