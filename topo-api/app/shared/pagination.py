from collections import OrderedDict
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPageNumberPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        next_page = None
        if self.page.has_next():
            next_page = self.page.next_page_number()

        prev_page = None
        if self.page.has_previous():
            prev_page = self.page.previous_page_number()

        return Response(
            {
                "next": next_page,
                "previous": prev_page,
                "results": data,
                "count": self.page.paginator.count,
            }
        )
