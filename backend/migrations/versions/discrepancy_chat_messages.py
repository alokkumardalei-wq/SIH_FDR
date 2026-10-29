"""Add messages column to discrepancy_cases for chat history.

Revision ID: discrepancy_chat_messages
Revises: bank_role_workflow
Create Date: 2026-10-29
"""
from alembic import op
import sqlalchemy as sa

revision = 'discrepancy_chat_messages'
down_revision = 'bank_role_workflow'
branch_labels = None
depends_on = None


def upgrade():
    dialect = op.get_context().dialect.name
    if dialect == 'sqlite':
        op.add_column('discrepancy_cases', sa.Column('messages', sa.JSON(), nullable=True, server_default='[]'))
        return

    with op.batch_alter_table('discrepancy_cases', schema=None) as batch_op:
        batch_op.add_column(sa.Column('messages', sa.JSON(), nullable=True, server_default='[]'))


def downgrade():
    dialect = op.get_context().dialect.name
    if dialect == 'sqlite':
        op.drop_column('discrepancy_cases', 'messages')
        return

    with op.batch_alter_table('discrepancy_cases', schema=None) as batch_op:
        batch_op.drop_column('messages')

