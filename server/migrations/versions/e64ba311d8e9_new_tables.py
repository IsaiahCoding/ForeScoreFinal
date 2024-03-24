"""new tables

Revision ID: e64ba311d8e9
Revises: 
Create Date: 2024-03-21 10:47:25.320382

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e64ba311d8e9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('club_distances',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('regular_distance', sa.Integer(), nullable=True),
    sa.Column('max_distance', sa.Integer(), nullable=True),
    sa.Column('min_distance', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('clubs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('brand', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.Column('average_score', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('club_distance_join',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('club_id', sa.Integer(), nullable=True),
    sa.Column('club_distance_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['club_distance_id'], ['club_distances.id'], name=op.f('fk_club_distance_join_club_distance_id_club_distances')),
    sa.ForeignKeyConstraint(['club_id'], ['clubs.id'], name=op.f('fk_club_distance_join_club_id_clubs')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_club_distance_join_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('scorecards',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('course_name', sa.String(), nullable=True),
    sa.Column('total_course_par', sa.Integer(), nullable=True),
    sa.Column('total_user_score', sa.Integer(), nullable=True),
    sa.Column('current_round', sa.Boolean(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_scorecards_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('hole_stats',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('hole_number', sa.Integer(), nullable=True),
    sa.Column('par', sa.Integer(), nullable=True),
    sa.Column('user_score', sa.Integer(), nullable=True),
    sa.Column('fairway_hit', sa.Boolean(), nullable=True),
    sa.Column('green_in_reg', sa.Boolean(), nullable=True),
    sa.Column('putts', sa.Integer(), nullable=True),
    sa.Column('scorecard_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['scorecard_id'], ['scorecards.id'], name=op.f('fk_hole_stats_scorecard_id_scorecards')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('hole_stats')
    op.drop_table('scorecards')
    op.drop_table('club_distance_join')
    op.drop_table('users')
    op.drop_table('clubs')
    op.drop_table('club_distances')
    # ### end Alembic commands ###