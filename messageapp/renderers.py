import json
from rest_framework.renderers import JSONRenderer


class MessageJSONRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, media_type=None, renderer_context=None):
        # # errors = data[0].get('errors', None)
        # token = data[0].get('token', None)

        # # if errors is not None:
        # #     return super(MessageJSONRenderer, self).render(data)

        # if token is not None and isinstance(token, bytes):
        #     data['token'] = token.decode('utf-8')

        return json.dumps({
            'message': data
        })
