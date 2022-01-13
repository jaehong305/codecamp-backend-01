/**
 * @openapi
 * /starbucks:
 *    get:
 *        summary: 커피 목록 조회
 *        tags: [Coffees]
 *        parameters:
 *            - in: query
 *              name: page
 *              type: int
 *        responses:
 *            200:
 *                description: 성공
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                number:
 *                                    type: string
 *                                    example: '아메리카노'
 *                                kcal:
 *                                    type: int
 *                                    example: 5
 */
